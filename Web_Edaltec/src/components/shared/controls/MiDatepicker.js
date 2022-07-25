import 'date-fns';
import React from 'react';
//------ material date time picker ----- 
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import deLocale from "date-fns/locale/es";
//------ fin  material date time picker ----- 

export default function MiDatepicker({valueDate, setDate, name, labelText }) {

  const handleDateChange = (date) => {
    setDate(date, name);
  }

  return (
    <div className='p-1'>
      <MuiPickersUtilsProvider locale={deLocale}  utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            label={labelText}
            value={ valueDate }
            // onChange={setDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
      </MuiPickersUtilsProvider>
    </div>

  );
}


