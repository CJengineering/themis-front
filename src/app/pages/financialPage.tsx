import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Overview } from '../main components/dashboard/overview';
import { DataTableUser } from '../columns-tables/data-table-passports';
import { Transaction } from '@/interfaces';
import { TransactionForm } from '../main components/TransactionForm';
import { ColumnTransactions } from '../columns-tables/columnsTramsactions';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { createPresentationSecondDialog, createPresentationUrl, createPrsentationTravel } from '../features/Presentations';
import { toggleSecond } from '../features/openDialog/dialogSlice';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { fetchTravels } from '../features/travel/fetchTravel';
import { TravelItem } from '../main components/TravelAuthForm';
import { Travel, TravelData } from '@/type';
const transactions: Transaction[] = [
  {
    transactionDate: '2022-01-01',

    amount: '573.00',
  },
  {
    transactionDate: '2022-01-01',

    amount: '573.00',
  },
];

export default function FinancialPage() {
  const dispatch = useAppDispatch();
  const dialogSecond = useAppSelector(createPresentationSecondDialog);
  const travels = useAppSelector((createPrsentationTravel));
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [progress, setProgress] = useState(0);
  const url = useAppSelector(createPresentationUrl);
  const userString = localStorage.getItem('user-data');
  if (!userString) return null;
  const userData = JSON.parse(userString);
  const userId = userData?.id;
  const userRole = userData?.role;
  console.log(travels);
  const toggleSecondDialog = () => {
    dispatch(toggleSecond());
  };
  const createGetColumnValue = (namingColumns: Record<string, string>) => {
    return (key: string): string => namingColumns[key] || key;
  };
  const namingColumnsTransaction: Record<string, string> = {
    amount: 'Amount',
    transactionDate: 'Date',
  };
  const getColumnValueForTransactions = createGetColumnValue(
    namingColumnsTransaction
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 100) {
          return oldProgress + 10;
        }
        clearInterval(interval);
        return 100;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${url}/transaction`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        setTransactions(data);
        console.log('this is transactions ',data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    
    const fetchDate = async () => {
      await dispatch<any>(
        fetchTravels(`${url}/travel`, {
          userRole: `${userRole}`,
          userId: `${userId}`,
        })
      );
    };
    if (progress === 100) {
      fetchDate();
      fetchTransactions();
    }
  }, [progress]);
  const totalAmountTravels =()=>{
    let total = 0;
    travels.map((travel)=>{
      if ((travel.costOriginal !== null )&& (travel.status === 'Finalisation')) {
        total = total + travel.costOriginal;
      }
    })
    return total;
  }
  const totalAmountTransactions =()=>{
    let total = 0;
    transactions.map((transaction)=>{
      if (transaction.amount !== null) {
        total = total + Number(transaction.amount);
      }
    })
    return total;
  }
  const formattedValue = (numericValue: number) =>{
   const forMatedValue = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    }).format(numericValue) 

    return forMatedValue;
  }
  const remaining = 1000000 -totalAmountTravels()
  const totalTravelAmount = totalAmountTravels();
  const totalTransactionAmount = totalAmountTransactions();
  const availableFunds = totalTransactionAmount - totalTravelAmount;
  function calculateMonthlyTotal(travels: Travel[]): { month: string; total: number }[] {
    const monthTotals: Record<string, number> = {};
  
    travels.forEach(travel => {
      if (travel.status === 'Finalisation') { // Check if the status is 'Finalisation'
        const date = new Date(travel.updatedAt);
        const month = date.toLocaleString('default', { month: 'long' });
        const cost = travel.costOriginal ?? 0;
       
        if (monthTotals[month]) {
          monthTotals[month] += cost;
        } else {
          monthTotals[month] = cost;
        }
      }
    });
  
    return Object.entries(monthTotals).map(([month, total]) => ({
      month,
      total,
    }));
  }
  const monthlyTotals = calculateMonthlyTotal(travels);
  
  console.log('monthly',monthlyTotals,'this is the data', formattedValue(totalAmountTravels()), 'this is the transactions', formattedValue(totalAmountTransactions()),'remaining', formattedValue(remaining)); 
  if(userRole ==='traveller'){
    return null;
  }
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4  pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Remaining budget
                </CardTitle>
                £
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formattedValue(remaining)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Travel costs
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formattedValue(totalTravelAmount )}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Available funds
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formattedValue(availableFunds )}</div>
              </CardContent>
              <CardFooter>
              <Dialog open={dialogSecond} onOpenChange={toggleSecondDialog}>
                <DialogTrigger>
                  <Button className="mt-8" variant="blue">
                    Add funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle> Add funds</DialogTitle>
                  </DialogHeader>
                  <TransactionForm />
                </DialogContent>
              </Dialog>
              </CardFooter>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>Travel costs</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview data={monthlyTotals} />
              </CardContent>
            </Card>
            <Card className="col-span-5">
              <CardHeader>
                <CardTitle>Deposits</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <DataTableUser
                  getColumnValue={getColumnValueForTransactions}
                  columns={ColumnTransactions}
                  data={transactions}
                  dialogContentComponent={TransactionForm}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
