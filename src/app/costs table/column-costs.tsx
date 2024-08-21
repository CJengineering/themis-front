import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import clsx from 'clsx';

export type Cost = {
  type: string;
  amountUSD: number;
  amountGBP: number;
  amountEUR: number;
  actualAmount: number;
  limitAmount: number;
};

export const columnsCosts: ColumnDef<Cost>[] = [
    {
        header: 'Type',
        accessorKey: 'type',
    },
    {
        header: 'Amount USD',
        accessorKey: 'amountUSD',
        cell: ({ row }) => {
            const amountUSD = row.getValue<number>('amountUSD');
            const limitAmount = row.getValue<number>('limitAmount');
            const isOverLimit = amountUSD > limitAmount;
            return (
                <div className={clsx({ 'bg-red-100': isOverLimit })}>
                    {amountUSD} $
                </div>
            );
        },
    },
    {
        header: 'Amount GBP',
        accessorKey: 'amountGBP',
        cell: ({ row }) => {
            const amountGBP = row.getValue<number>('amountGBP');
            const limitAmount = row.getValue<number>('limitAmount');
            const isOverLimit = amountGBP > limitAmount;
            return (
                <div className={clsx({ 'bg-red-100': isOverLimit })}>
                    {amountGBP} £
                </div>
            );
        },
    },
    {
        header: 'Amount EUR',
        accessorKey: 'amountEUR',
        cell: ({ row }) => {
            const amountEUR = row.getValue<number>('amountEUR');
            const limitAmount = row.getValue<number>('limitAmount');
            const isOverLimit = amountEUR > limitAmount;
            return (
                <div className={clsx({ 'bg-red-100': isOverLimit })}>
                    {amountEUR} €
                </div>
            );
        },
    },
    {
        header: 'Limit Amount',
        accessorKey: 'limitAmount',
        cell: ({ row }) => {
            const limitAmount = row.getValue<number>('limitAmount');
            return <div className="text-red-600">{limitAmount} $</div>;
        },
    },
];
