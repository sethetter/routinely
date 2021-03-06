import { Document, Schema, model } from 'mongoose'

import Activity from './Activity'

export interface IActivityLog extends Document {
  userId: string
  name: string
  value: number
  activityId: string
  completedAt: Date
}

const schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  activityId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 1,
  },
  completedAt: {
    type: Date,
    required: true,
  }
})

schema.pre('validate', async function (this: IActivityLog) {
  if (this.activityId) {
    const activity = await Activity.findOne({
      _id: this.activityId,
      userId: this.userId,
    }, 'name value')

    if (activity) {
      this.name = activity.name
      this.value = activity.value
    }
  }
})

const ActivityLog = model<IActivityLog>('ActivityLog', schema)

export default ActivityLog
