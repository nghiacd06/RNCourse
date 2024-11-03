const GOOGLE_API_KEY = "";

const getMapPreview = ({ lat, lng }: { lat: number; lng: number }) => {
  //   const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  //   return mapPreviewUrl;

  return "https://picsum.photos/seed/picsum/200/300";
};

const getMapAddress = async ({ lat, lng }: { lat: number; lng: number }) => {
  //   const res = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  //   );

  //   if (!res.ok) {
  //     throw new Error("Failed to fetch address");
  //   }
  //   const data = await res.json();
  //   const address = data.results[0].formatted_address

  return "Mocked Address";
};

export { getMapPreview, getMapAddress };
