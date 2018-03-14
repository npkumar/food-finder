import moment from 'moment'

export default (date) => {
  return moment(date).format('MMMM Do YYYY, h:mm:ss')
}
