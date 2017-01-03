// 'http://192.168.101.7:3002/me-services' 'http://192.168.255.116:3002/me-services'
export const memberSocketUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.255.111:3002/member' : 'http://sh.okertrip.com/member'
export const groupSocketUrl = process.env.NODE_ENV === 'development' ? 'http://192.168.255.107:3002/group' : 'http://sh.okertrip.com/group'
