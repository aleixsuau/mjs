import { Injectable } from '@angular/core';

export interface AgendaItem {
    title: string;
    description: string;
    date: string;
    time: string;
}

@Injectable()
export class AgendaService {
    agenda: AgendaItem[] = [
        {
            title: 'item1 title',
            description: 'item1 description',
            date: '01/08',
            time: '18:00'
        },
        {
            title: 'item2 title',
            description: 'item2 description',
            date: '01/09',
            time: '18:00'
        },
        {
            title: 'item3 title',
            description: 'item3 description',
            date: '01/10',
            time: '18:00'
        },
    ];

    getAgenda(): AgendaItem[] {
        return this.agenda;
    }
};
