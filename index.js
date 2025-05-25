import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';


const path = './data.json';
const date = moment().subtract(5,'d').format();

const data = {
  date: date,
};

jsonfile.writeFile(path, data, ()=> {
    console.log('Data written to file:', data);
    simpleGit().add('.').commit(date, { '--date': date }).push();});