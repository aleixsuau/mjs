/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface IEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    image: {
      title: string;
      url: string;
      size: number;
    };
}

interface INew {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    image: {
      title: string;
      url: string;
      size: number;
    };
}

interface IJob {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    image: {
      title: string;
      url: string;
      size: number;
    };
}

interface IUser {
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
  uid: string;
}

interface IImage {
  title: string;
  url: string;
  size: number;
}
