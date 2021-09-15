export interface Players {
    Page: number;
    totalPages: number;
    Items: number;
    totalItems: number;
    players: Player[];
}

export interface Player {
    _id: string;
    name: string;
    position: string;
    nation: string;
    team: string;
    __v: number;
}
