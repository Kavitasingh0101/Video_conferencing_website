const localVideo = document.getElementById('localStream');
const remoteVideos = document.getElementById('remoteVideos');
const joinButton = document.getElementById('joinButton');
const leaveButton = document.getElementById('leaveButton');

let localStream;
let room;

async function joinRoom() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;

    room = new SimplePeer({ initiator: true, stream: localStream });

    room.on('signal', data => {
      // Send the signaling data to the other peer (you'll need a signaling server in a real app)
      console.log('Signaling data:', data);
    });

    room.on('stream', remoteStream => {
      // Create a new video element for the remote stream
      const remoteVideo = document.createElement('video');
      remoteVideo.srcObject = remoteStream;
      remoteVideo.autoplay = true;
      remoteVideos.appendChild(remoteVideo);
    });

    joinButton.style.display = 'none';
    leaveButton.style.display = 'inline-block';
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
}

function leaveRoom() {
  localStream.getTracks().forEach(track => track.stop());
  remoteVideos.innerHTML = '';

  // Close the room (send a signal to the other peer to close their room as well)
  // This part needs to be implemented properly in a real app
  console.log('Room closed');

  joinButton.style.display = 'inline-block';
  leaveButton.style.display = 'none';
}

joinButton.addEventListener('click', joinRoom);
leaveButton.addEventListener('click', leaveRoom);
