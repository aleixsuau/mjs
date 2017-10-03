import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  agenda: IEvent[] = [];
  works: IWork[] = [];
  news: INew[] = [];

  constructor() {
    this.generateData(4);
  }
  // This method returns the data base (each key is a path 'api/key..')
  createDb() {
    return {
      agenda: this.agenda,
      works: this.works,
      news: this.news,
    };
  }

  private generateData(numberOfItems) {
    // Generate de Channels & Posts
    for (let i = 0; i < numberOfItems; i++) {
      this.agenda.push({
        id: `${i}`,
        title: `Event ${i}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: `2017-07-08`,
        time: `18:00`,
        image: `https://files.genial.guru/files/news/part_2/22205/49955-13-1000-15c7813afc-1484583985.jpg`
      });

      this.works.push({
        id: `${i}`,
        title: `Work ${i}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: `2017-07-08`,
        time: `18:00`,
        image: `https://files.genial.guru/files/news/part_2/22205/49955-13-1000-15c7813afc-1484583985.jpg`
      });

      this.news.push({
        id: `${i}`,
        title: `New ${i}`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        date: `2017-07-08`,
        time: `18:00`,
        image: `https://files.genial.guru/files/news/part_2/22205/49955-13-1000-15c7813afc-1484583985.jpg`
      });
    }
  }
}
