import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function VideoCall() {
  const { roomid } = useParams();

  const fullName = "hello";

  let myMeeting = async (element) => {
    // generate Kit Token
    // const appID = parseInt(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
    // const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    const appID = 63936471;
    const serverSecret = "4f45b4d1ead7cf2c34607ee9fcc2f708";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomid,
      uuid(),
      fullName || "user" + Date.now(),
      720
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Shareable link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomid,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      maxUsers: 10,
    });
  };

  return <div className="w-full h-screen" ref={myMeeting}></div>;
}
