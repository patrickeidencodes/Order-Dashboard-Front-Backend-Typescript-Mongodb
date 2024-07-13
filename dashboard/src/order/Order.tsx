export default class Order {
    [x: string]: any;
    id: number;
    date: Date;
    kundenNummer: number;
    produkt: string;
    notizen: string;
    dateien: File[];
    link: string;
    deadline: Date;
    status: 'waiting' | 'entry' | 'working' | 'check' | 'revision' | 'done' | 'book';
  
    constructor(id: number, date: Date, kundenNummer: number, produkt: string, notizen: string, dateien: File[], link: string, deadline: Date, status: 'waiting' | 'entry' | 'working' | 'check' | 'revision' | 'done'| 'book') {
      this.id = id;
      this.date = date;
      this.kundenNummer = kundenNummer;
      this.produkt = produkt;
      this.notizen = notizen;
      this.dateien = dateien;
      this.link = link;
      this.deadline = deadline;
      this.status = status;
    }
  }
  
