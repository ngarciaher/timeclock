

// date fns
import { format} from 'date-fns'

const TimecardDetails = ({ timecard }) => {

  return (
    <div className="timecard-details">
      
       <h4>{format(new Date(timecard.timein), "eeee")}</h4>
      <p><strong>TimeIn: </strong>{format(new Date(timecard.timein), 'MM/dd/yyyy hh:mm a')}<strong> &nbsp; &nbsp;
        TimeOut: </strong>{timecard.timeout ? format(new Date(timecard.timeout), 'MM/dd/yyyy hh:mm a') : <span className="material-symbols-outlined">Pace</span>}</p>
     
    </div>
  )
}

export default TimecardDetails