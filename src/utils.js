import Firestore from "@google-cloud/firestore";

const db = new Firestore({
    projectId: 'unify-ee0a5',
    keyFilename: 'unify-328418-c8687e44be6e.json',
});

export function filterMajor(major)
{
    const usersRef = db.collection('users');
    const query = await usersRef
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
        return array;
    }
}

export function filterCollege(college)
{
    const usersRef = db.collection('users');
    const query = await usersRef
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
        return array;
    }
}

export function filterName(name)
{
    const usersRef = db.collection('users');
    const query = await usersRef
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
        return array;
    }
}
