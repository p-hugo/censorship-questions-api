import mongoose from 'mongoose'
import { Question } from './Question'
const { DB_USER, PASSWD, DB } = process.env
const URL = `mongodb://${DB_USER}:${PASSWD}@${DB}`
mongoose.connect(
  URL,
  { useNewUrlParser: true }
)
mongoose.Promise = Promise

exports.getQuestions = () => Question.find()
exports.findQuestion = _id => Question.findById({ _id })
exports.createQuestion = question => Question.create(question)
exports.incrementAnswer = (_id, answer) => {
  const query = { $inc: { 'choices.$.count': 1, 'count': 1 } }
  const opt = { _id, 'choices.name': answer }
  return Question.update(opt, query)
}
