module.exports = {
  properties: {
    'c:id': 'CBERS_4_MUX_L2',
    'c:name': 'CBERS_4_MUX_L2',
    'c:description': 'CBERS 4 MUX System Corrected data',
    'eo:platform': 'CBERS-4',
    'eo:instrument': 'MUX',
    'eo:gsd': 20,
  },
  'eo:bands': {
    '5': {
      common_name: 'blue',
    },
    '6': {
      common_name: 'green',
    },
    '7': {
      common_name: 'red',
    },
    '8': {
      common_name: 'nir',
    },
  },
}
