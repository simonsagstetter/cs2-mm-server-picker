const convertRelay = (relay) => relay.map((data) => `${data.ipv4}:${data.port_range.join("-")}`);

module.exports = { convertRelay };
