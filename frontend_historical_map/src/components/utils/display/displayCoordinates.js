export function displayLatitudeDMS(latitudeNumber) {
    var latitude = toDegreesMinutesAndSeconds(latitudeNumber);
    var latitudeCardinal = latitudeNumber >= 0 ? "N" : "S";
    return latitude + latitudeCardinal;
}

export function displayLongitudeDMS(longitudeNumber) {
    var longitude = toDegreesMinutesAndSeconds(longitudeNumber);
    var longitudeCardinal = longitudeNumber >= 0 ? "E" : "W";
    return longitude + longitudeCardinal;
}

function toDegreesMinutesAndSeconds(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + "° " + minutes + "' " + seconds + "''";
}