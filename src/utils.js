import Firestore from "@google-cloud/firestore";

const db = new Firestore({
    projectId: 'unify-ee0a5',
    keyFilename: 'unify-328418-c8687e44be6e.json',
});

export default function addUser(uid, information)
{
  console.log("hi")
  console.log(db.collection('users').doc(uid))
  return db.collection('users').doc(uid).set(information);

}

export function filterMajor(major)
{
    const query = db
      .collection("users")
      .where('major', '==', major)
      .where('type', '==', 'college')
      .get();
    if (query.empty) {
    console.log('No matching documents.');
    return;
    }  
    else{
        var array = [];
        query.forEach(user => {
            array.push(user);
          });
        shuffle(array)
        return array;
    }
}

export function filterCollege(college)
{
    const query = db
      .collection("users")
      .where('college', '==', college)
      .where('type', '==', 'college')
      .get();
    if (query.empty) {
    console.log('No matching documents.');
    return;
    }  
    else{
        var array = [];
        query.forEach(user => {
            array.push(user);
          });
        shuffle(array)
        return array;
    }
}

export function filterName(name)
{
    const query = db
      .collection("users")
      .where('type', '==', 'college')
      .get();
    if (query.empty) {
    console.log('No matching documents.');
    return;
    }
    else{
        var array = [];
        query.forEach(user => {
            if(user.name.contains(name))
            {
                array.push(user);
            }
          });
        shuffle(array)
        return array;
    }
}

export function getRecommended(user)
{
    const query = db
      .collection("users")
      .where('type', '==', 'college')
      .where('major', '==', user.major)
      .where('college', 'in', user.collegeList)
      .where()
      .get();
    if (query.empty) {
    console.log('No matching documents.');
    return;
    }
    else{
        var array = [];
        query.forEach(user => {
            array.push(user)
          });
        shuffle(array)
        return array;
    }
}

export function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

