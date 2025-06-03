import { formatCurrency } from "../helpers"
import type { MenuItem, OrderItem } from "../types"

type OrderContentsProps = {
    order: OrderItem[],
    removeItem: (id: MenuItem['id']) => void
}

export default function OrderContents({ order, removeItem }: OrderContentsProps) {
    return (
        <div>
            <h2 className='font-black text-4xl'>Consumo</h2>

            <div className="space-y-3 mt-5">
                {order.length === 0 ?
                    <p className="text-center">La orden esta vacia</p>
                    : (
                        order.map(item => (
                            <div key={item.id}
                                className="flex justify-between border-t border-gray-200 py-5 items-center last-of-type:border-b"> 
                                <div>
                                    <p className="text-lg ">{item.name} - {formatCurrency(item.price)}</p>
                                    <p className="font-black">
                                        Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}
                                    </p>
                                </div>

                                <div>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded-lg font-bold uppercase"
                                        onClick={() => removeItem(item.id)}>
                                        X
                                    </button>
                                </div>

                            </div>
                        ))
                    )}
            </div>
        </div>
    )
}
