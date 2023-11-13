import { AutoIncrement, Column, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "tanks" })
export class Tank extends Model<Tank> {
    @PrimaryKey
    @AutoIncrement
    @Column
    public id: number;

    @Column
    public name: string;

    @Column
    public calibre: number;

    @Column
    public type: TankType;

    @Column
    public weakSpots: number;
}

export enum TankType {
    LIGHT,
    MEDIUM,
    HEAVY
}