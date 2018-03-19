import * as NodeGeocoder from 'node-geocoder';
import { config } from 'config/config';

class Geocoder {
  geocoder: NodeGeocoder.Geocoder

  constructor() {
    var geocoder = NodeGeocoder(config.geocoder);
  }

  tryGeocodeNewAddress(oldAddress, newAddress): Promise<NodeGeocoder.Entry[] | null> {
      // if no new address resolve with null
      if (!newAddress) return Promise.resolve(null);

      // if old address equals new address resolve with null
      if (oldAddress &&
        newAddress.primaryLine === oldAddress.primaryLine &&
        newAddress.secondaryLine === oldAddress.secondaryLine &&
        newAddress.city === oldAddress.city &&
        newAddress.state === oldAddress.state &&
        newAddress.zip === oldAddress.zip) {

        return Promise.resolve(null);
      }

      var stringifiedAddress =
        newAddress.primaryLine + ', ' +
        newAddress.city + ', ' +
        newAddress.state + ', ' +
        newAddress.zip;

      return this.geocoder.geocode(stringifiedAddress);
  }
}

export const geocoder = new Geocoder();