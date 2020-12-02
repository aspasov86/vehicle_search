import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import Search from 'semantic-ui-react/dist/commonjs/modules/Search/Search';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Card from 'semantic-ui-react/dist/commonjs/views/Card/Card';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image/Image';
import Placeholder from 'semantic-ui-react/dist/commonjs/elements/Placeholder/Placeholder';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import { useSelector } from 'react-redux';
import {
  searchForVehicleByLicense, getVehicleImage, checkIfVehicleAdded, saveVehicle
} from '../../services/services';
import VehicleInfoPeace from '../VehicleInfoPeace/VehicleInfoPeace';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const token = useSelector(state => state.token);
  const [theVehicle, setTheVehicle] = useState(null);
  const [vehicleImage, setVehicleImage] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNoResults(false);
    setVehicleImage(null);
    const search = async () => {
      // placing a search
      setVehicleLoading(true);
      const res = await searchForVehicleByLicense(searchTerm);
      if (get(res, 'data.length')) {
        setTheVehicle(res.data[0]);
        setVehicleLoading(false);

        // fetching an image
        setImageLoading(true);
        const imgRes = await getVehicleImage(res.data[0].merk);
        if (imgRes) setVehicleImage(get(imgRes, 'data.items[0].link', '...'));
        setImageLoading(false);

        // checking if already saved to the server
        setButtonLoading(true);
        const addedRes = await checkIfVehicleAdded(searchTerm, token);
        if (get(addedRes, 'data.id')) setAlreadyAdded(true);
        setButtonLoading(false);
      }
      setVehicleLoading(false);
      setNoResults(true);
    };

    searchTerm.length === 6 ? search() : setTheVehicle(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const onSearchChange = (event, { value }) => setSearchTerm(value);

  const onSave = vehiclesData => async () => {
    setSaving(true);
    await saveVehicle(vehiclesData, token);
    setSaving(false);
  };

  return (
    <div>
      <Search value={searchTerm} onSearchChange={onSearchChange} loading={vehicleLoading} showNoResults={false} />
      {theVehicle ? (
        <Card key={theVehicle.kenteken} className={styles.card}>
          {imageLoading ? (
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
          ) : (
            <Image src={vehicleImage} wrapped ui={false} size="large" />
          )}
          <Card.Content>
            <Card.Header>{theVehicle.merk}</Card.Header>
            <Card.Meta>{theVehicle.kenteken}</Card.Meta>
            <Card.Description>
              <VehicleInfoPeace label="Commercial name" info={theVehicle.handelsbenaming} />
              <VehicleInfoPeace label="Type" info={theVehicle.voertuigsoort} />
              <VehicleInfoPeace label="Color" info={theVehicle.eerste_kleur} />
              <VehicleInfoPeace label="Number of seats" info={theVehicle.aantal_zitplaatsen} />
              <VehicleInfoPeace label="Catalog price (€)" info={theVehicle.catalogusprijs} />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button
              primary
              fluid
              loading={buttonLoading || saving}
              disabled={alreadyAdded}
              onClick={onSave({
                vehicle: {
                  merk: theVehicle.merk,
                  handelsbenaming: theVehicle.handelsbenaming,
                  eerste_kleur: theVehicle.eerste_kleur,
                  license_plate: theVehicle.kenteken
                }
              })}
            >
              {alreadyAdded ? 'Already added' : 'Save'}
            </Button>
          </Card.Content>
        </Card>
      ) : (
        <Segment className={styles.segment}>
          {noResults
            ? 'No results found'
            : 'Search by licenseplate and retrieve the vehicle information (have to be 6 characters)'}
        </Segment>
      )}
    </div>
  );
};

export default SearchPage;
