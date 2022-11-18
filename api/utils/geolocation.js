const distance = (latitude1, longitude1, latitude2, longitude2) => {
  const lat1 = (latitude1 * Math.PI) / 180;
  const lon1 = (longitude1 * Math.PI) / 180;
  const lat2 = (latitude2 * Math.PI) / 180;
  const lon2 = (longitude2 * Math.PI) / 180;
  const distanceLat = lat2 - lat1;
  const distanceLon = lon2 - lon1;
  const a =
    Math.pow(Math.sin(distanceLat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(distanceLon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));
  const r = 6371;
  return c * r;
};

const getRadius = (latitude, longitude, radius) => {
  const kmXDegree = 111;
  const degree = radius / kmXDegree;
  latitude = Number(latitude);
  longitude = Number(longitude);

  return {
    maxLat: latitude + degree,
    minLat: latitude - degree,
    maxLon: longitude + degree,
    minLon: longitude - degree,
  };
};

//funcion para ver si el guardia esta en ese lugar
const isThere = (latitude, longitude, brand) => {
  if (
    brand.minLat < latitude &&
    brand.maxLat > latitude &&
    brand.minLon < longitude &&
    brand.maxLon > longitude
  ) {
    return true;
  } else {
    return false;
  }
};

const getDistancieBranch = (branchOffice, securityGuard) => {
  const arr = [];
  const mapa = branchOffice.map((branchOffice) => {
    const distancia = distance(
      branchOffice.latitude,
      branchOffice.longitude,
      securityGuard.latitude,
      securityGuard.longitude
    );
    if (distancia < 20) {
      arr.push(branchOffice.dataValues);
    }
  });
  return arr;
};

const getDistancieGuard = (branchOffice, securityGuard) => {
  const arr = [];
  const mapa = securityGuard.map((Guard) => {
    const distancia = distance(
      branchOffice.latitude,
      branchOffice.longitude,
      Guard.latitude,
      Guard.longitude
    );
    // console.log(distancia);
    if (distancia < 20) {
      arr.push(Guard.dataValues);
    }
  });
  return arr;
};

module.exports = {
  distance,
  getRadius,
  isThere,
  getDistancieBranch,
  getDistancieGuard,
};
