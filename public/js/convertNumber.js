function convertNumber(data) {
  try {
    const number = data;
    const thousand = 1000;
    const million = 1000000;
    const billion = 1000000000;
    const trillion = 1000000000000;

    if (number >= trillion) {
      const numberTrillion = number / trillion;
      return `$${numberTrillion.toFixed(2)}T`;
    } else if (number >= billion) {
      const numberBillion = number / billion;
      return `$${numberBillion.toFixed(2)}B`;
    } else if (number >= million) {
      const numberMillion = number / million;
      return `$${numberMillion.toFixed(2)}M`;
    } else if (number >= thousand) {
      const numberThousand = number / thousand;
      return `$${numberThousand.toFixed(2)}K`;
    } else {
      return `$${number}`;
    }
  } catch (error) {
    console.error(error.message);
  }
}

export { convertNumber };
