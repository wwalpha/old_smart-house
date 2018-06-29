import { storage } from 'fb';

export const upload = (localPath, remotePath) => {
  // Create a root reference
  const storageRef = storage.ref();
  // Create a reference to 'mountains.jpg'
  const task = storageRef.child(remotePath).put(localPath);

  task.on('state_changed', (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done`);
    // switch (snapshot.state) {
    // case firebase.storage.TaskState.PAUSED:
    //   console.log('Upload is paused');
    //   break;
    // case firebase.storage.TaskState.RUNNING:
    //   console.log('Upload is running');
    //   break;
    // }
  }, error => console.error(error), () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    task.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  });
};

export const upload2 = () => {
};
