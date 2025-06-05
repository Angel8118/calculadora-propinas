import { useMemo, type Dispatch } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
import type { OrderActions } from "../reducers/order-reducer"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    dispatch: Dispatch<OrderActions>
}

export default function OrderTotals( { order, tip, dispatch }: OrderTotalsProps) {

    const subtotalAmount = useMemo(() => order.reduce((total, item) => total + (item.price * item.quantity), 0), [order])
    const tipAmount = useMemo(() => subtotalAmount * tip, [order, tip])
    const totalAmount = useMemo(() => subtotalAmount + tipAmount, [order, tip])

  return ( 
    <>
    <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina: </h2>
        <p>Subtotal a Pagar: {''} 
            <span className="font-bold">{formatCurrency(subtotalAmount)}</span>
        </p>
        <p>Propina: {''}
            <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>
        <p>Total a Pagar: {''}
            <span className="font-bold">{formatCurrency(totalAmount)}</span>
        </p>
    </div>

    <button className="bg-black hover:bg-teal-500 text-white font-bold uppercase w-full p-3 rounded-lg mt-10 disabled:opacity-10"
    disabled={totalAmount === 0}
    onClick={() => dispatch({type: 'place-order'}) } >
        Confirmar Orden
    </button>
    
    </>
  )
}
