const s = require('superstruct');
const uuidv4 = require('uuid').v4();

const ISSUES = [
  'WAITING_ON_PU',
  'WAITING_ON_DE',
  'LATE_FOR_PU_PLANNED',
  'LATE_FOR_DE_PLANNED',
  'WRONG_PU_LOCATION',
  'WRONG_DE_LOCATION',
  'POSITION_NEEDED_BEFORE_PU',
  'POSITION_NEEDED_BEFORE_DE',
]

const ADR = s.object({
  un_code: s.string(),
  class: s.string(),
  packing_group: s.string()
});

const GoodValue = s.object({
  currency: s.size(s.string(), 3),
  value: s.min(s.number(), 0)
});

const Issue = s.enums(ISSUES)

const MESSAGE_ISSUE_MAX = 256

const CreateIssue = s.object({
  message: s.size(s.string(), 0, MESSAGE_ISSUE_MAX),
  issue: Issue,
})

const SolveIssue = s.object({
  message: s.size(s.string(), 0, MESSAGE_ISSUE_MAX),
  issue: Issue,
})

const TRACKING_ID_SIZE_MIN = 8;
const TRACKING_ID_SIZE_MAX = 128;

const OWNER_SIZE_MIN = 2;
const OWNER_SIZE_MAX = 64;

const REFERENCE_SIZE_MIN = 0;
const REFERENCE_SIZE_MAX = 128;

const REFERENCES_LENGTH_MIN = 1;
const REFERENCES_LENGTH_MAX = 5;

const COMMENT_SIZE_MIN = 1;
const COMMENT_SIZE_MAX = 256;

const ENTITY_TYPE = 'sfu/package';

const Package = s.object({
  tracking_id: s.defaulted(s.size(s.string(), TRACKING_ID_SIZE_MIN, TRACKING_ID_SIZE_MAX), uuidv4),
  owner: s.size(s.string(), OWNER_SIZE_MIN, OWNER_SIZE_MAX),
  status: s.defaulted(
    s.optional(s.enums(['waiting_for_pickup', 'pickup_delayed', 'picked_up', 'delivery_delayed', 'delivered'])),
    'waiting_for_pickup'
  ),
  issues: s.defaulted(s.optional(s.array(Issue)), []),
  stackable: s.defaulted(s.enums(['no', '1', '2', '3', '4']), 'no'),
  quantity: s.defaulted(s.integer(), 1),
  references: s.optional(s.size(s.array(s.size(s.string(), REFERENCE_SIZE_MIN, REFERENCE_SIZE_MAX)), REFERENCES_LENGTH_MIN, REFERENCES_LENGTH_MAX)),
  length: s.min(s.number(), 0),
  width: s.min(s.number(), 0),
  height: s.min(s.number(), 0),
  weight: s.min(s.number(), 0),
  package_type: s.optional(s.defaulted(s.enums(['parcel', 'pallet']), 'parcel')),
  type: s.defaulted(s.optional(s.literal(ENTITY_TYPE)), ENTITY_TYPE),
  adr: s.optional(ADR),
  comment: s.optional(s.size(s.string(), COMMENT_SIZE_MIN, COMMENT_SIZE_MAX)),
  good_value: s.optional(GoodValue)
});

module.exports = {
  transportPackage: Package,
  adr: ADR,
  goodValue: GoodValue,
  issue: Issue,
  createIssue: CreateIssue,
  solveIssue: SolveIssue,

  TRACKING_ID_SIZE_MIN,
  TRACKING_ID_SIZE_MAX,

  OWNER_SIZE_MIN,
  OWNER_SIZE_MAX,

  REFERENCE_SIZE_MIN,
  REFERENCE_SIZE_MAX,

  REFERENCES_LENGTH_MIN,
  REFERENCES_LENGTH_MAX,

  COMMENT_SIZE_MIN,
  COMMENT_SIZE_MAX,

  ISSUES,
  MESSAGE_ISSUE_MAX,

  ENTITY_TYPE
}
