import _ from "lodash";

export const fetchCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/region/europe"
    );

    const data = await response.json();

    return _.sampleSize(data, 6).map((country: any, index: number) => ({
      id: index + 1,
      name: country.name.common,
      img: country.flags.png,
      isFlipped: false,
      isOpened: false,
    }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
