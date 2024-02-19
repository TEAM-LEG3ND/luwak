import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    paymentKey: string;

    @ApiProperty()
    totalAmount: number;

    @ApiProperty()
    balanceAmount: number;
    
    @ApiProperty()
    type: string;
    
    @ApiProperty()
    orderId: string;

    @ApiProperty()
    orderName: string;
    
    @ApiProperty()
    mId: string;

    @ApiProperty()
    cancels: object[];
    
    @ApiProperty()
    status: string;
}