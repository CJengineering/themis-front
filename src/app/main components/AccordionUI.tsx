import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogDemo } from './DialogDemo';
import { AccommodationDialog } from './AccomodationDialog';
import { ExpensesForm } from './ExpensesFormUI';

export function AccordionUI() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Roadmap</AccordionTrigger>
        <AccordionContent>
          <div className="relative flex items-center justify-center">
            <div className="flex w-3/4 h-32">
              <div className="flex flex-col items-start w-1/4 pr-4">
                <div className="text-xl">20h34</div>
                <p className="text-sm text-muted-foreground">20/04/24</p>
              </div>

              <div className="relative flex items-start justify-center w-8">
                <div className="absolute top-0 w-4 h-4 bg-green-500 rounded-full shadow-neonBlur"></div>
                <div
                  className="border-l border-dotted border-gray-400 h-full"
                  style={{ borderWidth: '2px' }}
                ></div>
              </div>

              <div className="flex flex-col items-start w-3/4 pl-4">
                <div className="text-lg">Tunis Carthage Airport</div>
                <p className="text-sm text-muted-foreground"> Details</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="flex w-3/4 h-32">
              <div className="flex flex-col items-end w-1/4 pr-4">
                <div className="text-xl">22h34</div>
                <p className="text-sm text-muted-foreground">20/04/24</p>
              </div>

              <div className="relative flex items-start justify-center w-8">
                <div className="absolute top-0 w-4 h-4 bg-gray-500 rounded-full "></div>
                <div
                  className="border-l border-dotted border-gray-400 h-full"
                  style={{ borderWidth: '2px' }}
                ></div>
              </div>

              <div className="flex flex-col items-start w-3/4 pl-4">
                <div className="text-lg">Airport Nice</div>
                <p className="text-sm text-muted-foreground"> Details</p>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="flex w-3/4 h-32">
              <div className="flex flex-col items-end w-1/4 pr-4">
                <div className="text-xl">22h34</div>
                <p className="text-sm text-muted-foreground">20/04/24</p>
              </div>

              <div className="relative flex items-start justify-center w-8">
                <div className="absolute top-0 w-4 h-4 bg-gray-500 rounded-full "></div>
                <div
                  className="border-l border-dotted border-gray-400 h-full"
                  style={{ borderWidth: '2px' }}
                ></div>
              </div>

              <div className="flex flex-col items-start w-3/4 pl-4">
                <div className="text-lg">Airport Nice</div>
                <p className="text-sm text-muted-foreground"> Details</p>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="flex w-3/4 h-32">
              <div className="flex flex-col items-start w-1/4 pr-4">
                <div className="text-xl">20h34</div>
                <p className="text-sm text-muted-foreground">20/04/24</p>
              </div>

              <div className="relative flex iitems-end justify-center w-8">
                <div className="absolute top-0 w-4 h-4 bg-gray-500 rounded-full shadow-neonBlur"></div>
                <div
                  className="border-l border-dotted border-gray-400 h-full"
                  style={{ borderWidth: '2px' }}
                ></div>
                <div className="absolute bottom-0 w-4 h-4 bg-red-500 rounded-full shadow-neonBlur"></div>
              </div>

              <div className="flex flex-col items-start w-3/4 pl-4">
                <div className="text-lg">Tunis Carthage Airport</div>

                <DialogDemo />
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Accomodations</AccordionTrigger>
        <AccordionContent>
          <div className=" p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-start">
            <span className="material-icons text-3xl">hotel</span>
            <div>
              <h3 className="text-xl font-semibold">Rivera Hotel</h3>
              <p className="text-sm text-gray-500">
                02 April 2024 - 04 April 2024
              </p>
            </div>
            <AccommodationDialog />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Expenses</AccordionTrigger>
        <AccordionContent>
          <div>
            <h6> Today, 04 April</h6>
            <div className=" bg-gray-100 p-4 grid grid-cols-12 ">
              <div className="col-span-3 flex items-center">
                <span className="material-icons">restaurant</span>
              </div>
              <div className="col-span-6">
                <h3 className="text-xl font-semibold">Mc Donalds</h3>
                <p className="text-sm text-gray-500">11:21AM</p>
              </div>
              <div className="col-span-3">
                <p className="mt-2 text-lg font-bold">£20.00</p>
              </div>
            </div>
            <div className=" bg-gray-100 mt-2 p-4 grid grid-cols-12 ">
              <div className="col-span-3 flex items-center">
                <span className="material-icons text-3xl ">shopping_cart</span>
              </div>
              <div className="col-span-6">
                <h3 className="text-xl font-semibold">Pencils</h3>
                <p className="text-sm text-gray-500">11:21AM</p>
              </div>
              <div className="col-span-3">
                <p className="mt-2 text-lg font-bold">£10.00</p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <h6> 03 April 2024</h6>
            <div className=" bg-blue-100 mt-2 p-4 grid grid-cols-12 ">
              <div className="col-span-2 flex items-center">
                <span className="material-icons text-3xl ">restaurant</span>
              </div>
              <div className="col-span-5">
              <h3 className="text-xl font-semibold">Mc Donalds</h3>
                <p className="text-sm text-gray-500">11:21AM</p>
              </div>
              <div className="col-span-3">
                <p className="mt-2 text-lg font-bold">£10.00</p>
              </div>
              <div className="col-span-2">
                <ExpensesForm />
              </div>
            </div>
            <div className=" bg-blue-100 mt-2 p-4 grid grid-cols-12 ">
              <div className="col-span-2 flex items-center">
                <span className="material-icons text-3xl ">shopping_cart</span>
              </div>
              <div className="col-span-5">
                <h3 className="text-xl font-semibold">Pencils</h3>
                <p className="text-sm text-gray-500">11:21AM</p>
              </div>
              <div className="col-span-3">
                <p className="mt-2 text-lg font-bold">£10.00</p>
              </div>
              <div className="col-span-2">
                <ExpensesForm />
              </div>
            </div>
          </div>
          <p className="text-sm text-center mt-2 text-muted-foreground">
            View all
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
