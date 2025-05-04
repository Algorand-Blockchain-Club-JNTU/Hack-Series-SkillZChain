import { Contract } from '@algorandfoundation/tealscript';


export class Game extends Contract {


    player1 = GlobalStateKey<Address>();
  
    player2 = GlobalStateKey<Address>();
    depositedAmount = GlobalStateKey<uint64>();
    maxDepositAmount = GlobalStateKey<uint64>();
    winner = GlobalStateKey<Address>();
    player1Move = BoxKey<string>({key:'player1Move',dynamicSize: true});
    player2Move = BoxKey<string>({key:'player2Move',dynamicSize: true});
    player1Chances = GlobalStateKey<uint64>();
    player2Chances = GlobalStateKey<uint64>();

    status = GlobalStateKey<string>(); // Possible values: 'Active', 'Expired'

    createApplication(): void {

        
        this.depositedAmount.value = 0;
        this.maxDepositAmount.value = 5;


      }
      createBox(): void {
        this.player1Move.create(45)
        this.player2Move.create(45)

      }

      depositfundsPlayer1(ftransx : PayTxn){
        assert(
          !this.player1.exists
        );

          verifyPayTxn(ftransx, {
            receiver: this.app.address,
            });
        this.depositedAmount.value += ftransx.amount;
        this.player1.value=this.txn.sender;

      }

      depositfundsPlayer2(ftransx : PayTxn){
        assert(
          !this.player2.exists
        );

          verifyPayTxn(ftransx, {
            receiver: this.app.address,
            });
        this.depositedAmount.value += ftransx.amount;
            this.player2.value=this.txn.sender;
      }
      sendFunds (player: Address){

        assert(
            this.txn.sender === this.app.creator
          );
          sendPayment({
            receiver: player,
            amount: 9000000,
          });
          this.depositedAmount.value = 0;



      }


      joinGame (player: Address){
        assert(
            !this.player2.exists
          );

          this.player2.value =player;

      }

      player1turn (move : string){


        assert(this.txn.sender == this.player1.value );

        this.player1Move.value = move;
        this.player1Chances.value+=1;


      }
      player2turn (move : string){


        assert(this.txn.sender == this.player2.value );

        this.player2Move.value = move;
        this.player2Chances.value+=1;


      }



      setWinner (winner : Address){

        assert(this.txn.sender == this.app.creator);

        this.winner.value = winner


      }

}