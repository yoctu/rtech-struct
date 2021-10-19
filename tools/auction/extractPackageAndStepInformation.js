const extract = (auction) => {
  const steps = [];
  const packages = [];

  if (auction.options.includes("MULTISTEP")) {
    const packageLength = 38;
    const dimensionsLength = 10;
    const addressLength = 14;
    const nbrPackages = auction.dimension.length / packageLength;

    const stepsIds = new Set();

    for (let i = 0; i < nbrPackages; i++) {
      const pkg = auction.dimension.slice(
        i * packageLength,
        (i + 1) * packageLength
      );

      stepsIds.add(pkg[dimensionsLength]);
      stepsIds.add(pkg[dimensionsLength + addressLength]);
    }

    const nbSteps = stepsIds.size;

    for (let i = 0; i < nbrPackages; i++) {
      const pkg = auction.dimension.slice(
        i * packageLength,
        (i + 1) * packageLength
      );
      const dimensions = pkg.slice(0, dimensionsLength);
      const addressA = pkg.slice(
        dimensionsLength,
        dimensionsLength + addressLength
      );
      const addressB = pkg.slice(
        dimensionsLength + addressLength,
        packageLength
      );

      const idA = parseKeyPackage(addressA[0], nbSteps);
      const idB = parseKeyPackage(addressB[0], nbSteps);

      packages.push({
        puID: idA,
        deID: idB,
        quantity: parseInt(dimensions[0]),
        length: parseFloat(dimensions[1]),
        width: parseFloat(dimensions[2]),
        height: parseFloat(dimensions[3]),
        weight: parseFloat(dimensions[4]),
        note: dimensions[5],
        stackable: dimensions[6],
        adrCode: dimensions[7],
        value: dimensions[8],
        insuranceCode: dimensions[9]
      });

      if (steps.find((e) => e.id === idA) === undefined) {
        steps.push({
          id: idA,
          key:
            addressA[0].length > 1
              ? addressA[0]
              : `${auction.key}-${addressA[0]}`,
          date: addressA[12],
          dateUntil: addressA[13],
          address: {
            street: addressA[1],
            zipcode: addressA[2],
            city: addressA[3],
            country: addressA[4],
            countryCode: addressA[5],
            location: addressA[6],
            timezone: addressA[7]
          },
          contact: {
            companyName: addressA[8],
            name: addressA[9],
            email: addressA[10],
            phone: addressA[11]
          }
        });
      }

      if (steps.find((e) => e.id === idB) === undefined) {
        steps.push({
          id: idB,
          key:
            addressB[0].length > 1
              ? addressB[0]
              : `${auction.key}-${addressB[0]}`,
          date: addressB[12],
          dateUntil: addressB[13],
          address: {
            street: addressB[1],
            zipcode: addressB[2],
            city: addressB[3],
            country: addressB[4],
            countryCode: addressB[5],
            location: addressB[6],
            timezone: addressB[7]
          },
          contact: {
            companyName: addressB[8],
            name: addressB[9],
            email: addressB[10],
            phone: addressB[11]
          }
        });
      }
    }

    steps.sort((a, b) => a.id - b.id);
  } else {
    const stepA = {
      id: 1,
      key: `${auction.key}-A`,
      date: auction.puDate,
      address: {
        street: auction.puPlace[0],
        zipcode: auction.puPlace[1],
        city: auction.puPlace[2],
        country: auction.puPlace[3],
        countryCode: auction.puPlace[4],
        location: auction.puLocation
      }
    };

    const stepB = {
      id: 2,
      key: `${auction.key}-B`,
      date: auction.deDate,
      address: {
        street: auction.dePlace[0],
        zipcode: auction.dePlace[1],
        city: auction.dePlace[2],
        country: auction.dePlace[3],
        countryCode: auction.dePlace[4],
        location: auction.deLocation
      }
    };

    if (auction.puDateRange) {
      stepA.dateUntil = auction.puDateRange;
    }

    if (!!auction.puPlace[5]) {
      stepA.address.timezone = auction.puPlace[5];
    }

    if (!!auction.puContact) {
      stepA.contact = {
        companyName: auction.puContact[0],
        name: auction.puContact[1],
        email: auction.puContact[2],
        phone: auction.puContact[3]
      };
    }

    if (auction.deDateRange) {
      stepB.dateUntil = auction.deDateRange;
    }

    if (!!auction.dePlace[5]) {
      stepB.address.timezone = auction.dePlace[5];
    }

    if (!!auction.deContact) {
      stepB.contact = {
        companyName: auction.deContact[0],
        name: auction.deContact[1],
        email: auction.deContact[2],
        phone: auction.deContact[3]
      };
    }

    steps.push(stepA);
    steps.push(stepB);

    if (auction.options.includes("PKG_V1")) {
      for (let i = 0; i < auction.dimension.length / 6; i++) {
        const offset = i * 6;

        let stackable = "no";

        const stackableMatch =
          auction.dimension[5 + offset].match(/stackable:[\s]*(\d)/m);

        if (stackableMatch && stackableMatch[1]) {
          stackable = stackableMatch[1];
        }

        packages.push({
          puID: 1,
          deID: 2,
          quantity: parseInt(auction.dimension[offset]),
          length: parseFloat(auction.dimension[1 + offset]),
          width: parseFloat(auction.dimension[2 + offset]),
          height: parseFloat(auction.dimension[3 + offset]),
          weight: parseFloat(auction.dimension[4 + offset]),
          note: null,
          stackable: stackable,
          adrCode: null,
          value: null,
          insuranceCode: null
        });
      }
    } else {
      for (let i = 0; i < auction.dimension.length / 9; i++) {
        const offset = i * 9;

        let stackable = "no";

        const stackableMatch =
          auction.dimension[5 + offset].match(/stackable:[\s]*(\d)/m);

        if (stackableMatch && stackableMatch[1]) {
          stackable = stackableMatch[1];
        }

        packages.push({
          puID: 1,
          deID: 2,
          quantity: parseInt(auction.dimension[offset]),
          length: parseFloat(auction.dimension[1 + offset]),
          width: parseFloat(auction.dimension[2 + offset]),
          height: parseFloat(auction.dimension[3 + offset]),
          weight: parseFloat(auction.dimension[4 + offset]),
          note: null,
          stackable: stackable,
          adrCode: auction.dimension[6 + offset],
          value: auction.dimension[7 + offset],
          insuranceCode: auction.dimension[8 + offset]
        });
      }
    }
  }

  let extraCost = auction.extras || [];
  let vehicles = auction.vehicles || [];

  if (vehicles.length > 0) {
    const positionUnderscore = vehicles[0].indexOf("_");

    if (positionUnderscore >= 0 && !!extraCost) {
      const vehicle = vehicles[0].substring(0, positionUnderscore);
      const extra = vehicles[0].substring(positionUnderscore + 1);
      extraCost.push(extra.toUpperCase());

      vehicles = [vehicle];
    }
  }

  packages.forEach((pck) => {
    if (!!pck.adrCode) {
      pck.adr = parseADR(pck.adrCode);
    }

    if (!!pck.value) {
      pck.goodValue = parseGoodValue(pck.value);
    }
  });

  return { steps, packages, extraCost, vehicles };
};

const parseKeyPackage = (key, nbSteps) => {
  const matches = key.match(/(\w+)-(\w)/);

  if (matches) {
    key = matches[2];
  }

  if (key === "A") {
    return 1;
  }

  if (key === "B") {
    return nbSteps;
  }

  return key.charCodeAt(0) - 97 + 2;
};

const parseADR = (value) => {
  const parts = value.split(",");
  return {
    class: parts[0],
    un_code: parts[1],
    packing_group: parts[2]
  };
};

const parseGoodValue = (value) => {
  const parts = value.split(",");

  return {
    value: Number.parseFloat(parts[0]),
    currency: parts[1] || "EUR"
  };
};

module.exports = extract;
