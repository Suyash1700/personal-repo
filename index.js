import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';


const path = './data.json';
const date = moment().subtract(120,'d').format();

const data = {
  date: date,
};

const git = simpleGit();

// jsonfile.writeFile(path, data, ()=> {
//     console.log('Data written to file:', data);
//     simpleGit().add(['./index.json','./data.json']).commit(date, { '--date': date }).push();});

jsonfile.writeFile(path, data, async err => {
    if (err) {
      return console.error('Failed to write JSON:', err);
    }
  
    console.log('Data written to file:', data);
  
    try {
      // stage your files
      await git.add(['index.js','data.json']);
  
      // commit with your custom date
      await git.commit(
        `Update data for ${date}`,      // commit message
        undefined,                      // files is undefined because we already ran add()
        { '--date': date }              // commit options
      );
  
      // push to main
      await git.push('origin', 'main');
  
      console.log('Changes committed and pushed!');
    } catch (e) {
      console.error('Git error:', e);
    }
  });