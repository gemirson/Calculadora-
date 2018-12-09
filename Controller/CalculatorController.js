class  CalculatorController
{
    
    /////////////////////////
    // Construtor da classe 
    //
    ////////////////////////
    constructor()
    {
     this._locale = "pt-BR";   
     this._displayCalcEl =document.querySelector("#display");
     this._dateEl = document.querySelector("#data");
     this._timeEl = document.querySelector("#hora");
     this._currentDate;
     this._operation=[];
     this.Initializa();
     this.InitializaButtonsEvents();
            
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    Initializa()
    {
        this.SetDisplay();
        //--------------- Incrementa o segundos no relogio---------------------------//
         setInterval(()=>{
         
            this.SetDisplay();

         },1000);

         this.setLastNumbersToDisplay();
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    SetDisplay()
    {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            month: "2-digit",
            year : "2-digit"
        });
        
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    get displayTime()
    {
        return this._timeEl.innerHTML;
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    set displayTime(valuedisplayTime)
    {
        return this._timeEl.innerHTML = valuedisplayTime;
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    get displayDate()
    {
        return this._dateEl.innerHTML;
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    set displayDate(valuedisplayDate)
    {
        return this._dateEl.innerHTML = valuedisplayDate;
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    get  displayCalc()
    {
        return this._displayCalcEl.innerHTML;
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    set displayCalc(valueDisplayCalc)
    {
        this._displayCalcEl.innerHTML = valueDisplayCalc;

    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    get currentDate()
    {
        return this._currentDate = new Date();
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    set currentDate(valuecurrentDate)
    {
        return this._currentDate = valuecurrentDate;
    }

    
    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    ClearAll()
    {
       this._operation=[];
       this.setLastNumbersToDisplay();
    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    ClearEnty()
    {
       this._operation.pop();
       this.setLastNumbersToDisplay();
    }
  
    setError()
    {
        this.displayCalc = "ERROR";
    }

    getLastOperation()
    {
        return this._operation[this._operation.length-1];
    }
     
    setLastOperation(value)
    {
        return this._operation[this._operation.length-1] = value;
    } 

    IsOperator(valueOperation)
    {
        return (['+','-','*','/','%'].indexOf(valueOperation) > -1);
    }


    pushOperation(value)
    {
        this._operation.push(value);

        if(this._operation.length > 3)
        {
          this.cal();
        }
    }

 
    cal()
    {
        let last='0';

        if (this._operation.length > 3)
        {
            last= this._operation.pop();
        }

        let result = eval(this._operation.join(""));

            if(last=='%')
            {
                result /= 100;
                this._operation= [result];
            }
            else
            {
                this._operation= [result];
                if(last)  this._operation.push(last);
            }
        
            this.setLastNumbersToDisplay();
    }

    setLastNumbersToDisplay()
    {
        let lastNumbers;

        for(let i= this._operation.length; i>=0;i--)
        {
            if(!this.IsOperator(this._operation[i]))
            {
                lastNumbers =this._operation[i];
                break;
            }
        }

        if(!lastNumbers) lastNumbers = 0;
        this.displayCalc =  lastNumbers;
    }


    AddOperation(valueOperation)
    {
        if(isNaN(this.getLastOperation()))
        {
                if(this.IsOperator(valueOperation))
                {
                     this._operation[this._operation.length-1]= valueOperation;
                
                }
                else if(isNaN(valueOperation))
                {
                     this.setLastOperation(value);
                }
                else
                {
                     console.log(valueOperation);
                     this.pushOperation(valueOperation);
                     this.setLastNumbersToDisplay();
                }
        } else{

            if(this.IsOperator(valueOperation))
            {
                this.pushOperation(valueOperation);
            
            }
            else 
            {
                let newValue = this.getLastOperation().toString() + valueOperation.toString();
                this.setLastOperation(parseInt(newValue));
                this.setLastNumbersToDisplay();
            }
           
           
        }
        
        console.log(this._operation);
    }

   
    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    Exec(parameters)
    {
        switch(parameters)
        {
            case 'ac':
            this.ClearAll();
            break;
            case 'ce':
            this.ClearEnty();
            break;
            case 'soma':
            this.AddOperation('+')
            break;
            case 'subtracao':
            this.AddOperation('-')
            break;
            case 'multiplicacao':
            this.AddOperation('*')
            break;
            case 'divisao':
            this.AddOperation('/')
            case 'porcento':
            this.AddOperation('%')
            case 'igual':
            this.cal();
            case 'oponto':
            this.AddOperation('.')
            break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            this.AddOperation(parseInt(parameters));
            break;
            default:
            this.setError();
            break;


        }

    }

    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    addEventListenerAll(element , events, fnc)
    {
         events.split(' ').forEach(events=>
         {
             element.addEventListener(events,fnc,true);
         });
    }
 
    //================================================================================//
    //=                                                                              =//
    //=                                                                              =//
    //=                                                                              =//
    //================================================================================//
    InitializaButtonsEvents()  
    {
       let buttons = document.querySelectorAll("#buttons > g,#parts > g");
        
        buttons.forEach(btn=>
        {
           //---------------------- Evento Click e drag ----------------------------// 
           this.addEventListenerAll(btn,"click drag", e=>{
               this.Exec(btn.className.baseVal.replace("btn-",""));
               console.log(btn.className.baseVal.replace("btn-",""));
           });

           //---------------------- trocar o curso do mouse ------------------------//
           this.addEventListenerAll(btn,"mouseover mouseup mousedown", e=>
           {
               btn.style.cursor = "pointer";
           });

       });
    }


   
};