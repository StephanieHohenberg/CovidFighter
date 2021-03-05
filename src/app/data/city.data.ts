export interface City {
  name: string;
  southEast: {lat, lng};
  northWest: {lat, lng};
  centrum: {lat, lng};
}

export const AMSTERDAM: City = {
  name: "Amsterdam",
  southEast: {
    lat: 52.29798183210937,
    lng: 4.724807739257812,
  },
  northWest: {
    lat: 52.44471056482437,
    lng: 5.107269287109375,
  },
  centrum: {
    lat: 52.367984,
    lng: 4.903561,
  }
};


export const BERLIN: City = {
  name: 'Berlin',
  southEast: {
    lat: 52.354634948622525,
    lng: 13.114929199218748,
  },
  northWest: {
    lat: 52.71300326104201,
    lng: 13.745269775390625,
  },
  centrum: {
    lat: 52.520008,
    lng: 13.404954,
  }
};
