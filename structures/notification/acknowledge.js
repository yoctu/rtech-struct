const s = require('superstruct')
const isUuid = require('is-uuid')
const uuidStruct = s.define('uuid', isUuid.v4)

const NOTIFICATION_IDS_SIZE_MIN = 1;
const NOTIFICATION_IDS_SIZE_MAX = 512;

const structure = s.object({
    name: s.string(),
    notificationsIds: s.size(s.array(uuidStruct), NOTIFICATION_IDS_SIZE_MIN, NOTIFICATION_IDS_SIZE_MAX)
})

module.exports = { structure, NOTIFICATION_IDS_SIZE_MIN, NOTIFICATION_IDS_SIZE_MAX }
