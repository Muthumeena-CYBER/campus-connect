import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";

// Types
export type UserRole = "student" | "canteen";

type AppState = {
  userRole: UserRole;
};

type Action =
  | { type: "SET_ROLE"; role: UserRole };

const initialState: AppState = {
  userRole: "student",
};

// Context
const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, userRole: action.role };
    default:
      return state;
  }
}

// API Helpers
const API_BASE = "http://localhost:3000/api";

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  return (await res.json()) as T;
}

// Domain Types
type MenuItem = { id: string; name: string; price: number; available: boolean };
type Order = { id: string; itemId: string; itemName: string; qty: number; status: "pending" | "picked"; createdAt: string };

type MenuCreate = { name: string; price: number; available: boolean };

// Student View
function StudentView() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [history, setHistory] = useState<Order[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<{ itemId: string; qty: number }>({ itemId: "", qty: 1 });

  useEffect(() => {
    // load menu & history
    void (async () => {
      const [m, h] = await Promise.all([
        api<MenuItem[]>("/canteen/menu"),
        api<Order[]>("/canteen/orders/me"),
      ]);
      setMenu(m);
      setHistory(h);
    })();
  }, []);

  // When menu is fetched, initialize selection if empty
  useEffect(() => {
    if (menu.length && !form.itemId) {
      setForm((f) => ({ ...f, itemId: menu[0].id }));
    }
  }, [menu, form.itemId]);

  async function submitPreOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const order = await api<Order>("/canteen/orders", {
        method: "POST",
        body: JSON.stringify({ itemId: form.itemId, qty: form.qty }),
      });
      setHistory((h) => [order, ...h]);
    } catch (err) {
      console.error(err);
      alert("Failed to submit order");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Menu Panel */}
      <section className="col-span-7 rounded-xl border p-4 bg-background">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Menu</h2>
          <span className="text-sm text-muted-foreground">{menu.length} items</span>
        </header>
        <div className="max-h-[60vh] overflow-auto rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Available</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((m) => (
                <tr key={m.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">₹{m.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${m.available ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}>
                      {m.available ? "In stock" : "Out"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form className="mt-4 flex items-end gap-3" onSubmit={submitPreOrder}>
          <label className="flex-1" htmlFor="student-menu-item">
            <span className="mb-1 block text-xs text-muted-foreground">Item</span>
            <select
              id="student-menu-item"
              className="w-full rounded-md border bg-background px-3 py-2"
              aria-label="Menu item"
              title="Menu item"
              value={form.itemId}
              onChange={(e) => setForm((f) => ({ ...f, itemId: e.target.value }))}
            >
              {menu.filter((m) => m.available).map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-xs text-muted-foreground">Qty</span>
            <input
              type="number"
              min={1}
              className="w-24 rounded-md border bg-background px-3 py-2"
              value={form.qty}
              onChange={(e) => setForm((f) => ({ ...f, qty: Number(e.target.value) }))}
            />
          </label>
          <button disabled={submitting} className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-90 disabled:opacity-50">
            {submitting ? "Submitting..." : "Pre-Order"}
          </button>
        </form>
      </section>

      {/* History Panel */}
      <section className="col-span-5 rounded-xl border p-4 bg-background">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">My Orders</h2>
        </header>
        <div className="max-h-[60vh] overflow-auto rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-left">Qty</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((o) => (
                <tr key={o.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-2">{o.itemName}</td>
                  <td className="px-4 py-2">{o.qty}</td>
                  <td className="px-4 py-2">{o.status === "picked" ? "Picked Up" : "Pending"}</td>
                  <td className="px-4 py-2">{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Canteen In-charge View
function CanteenView() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [queue, setQueue] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function refreshAll() {
    setLoading(true);
    try {
      const [m, q] = await Promise.all([
        api<MenuItem[]>("/canteen/menu"),
        api<Order[]>("/canteen/orders/pending"),
      ]);
      setMenu(m);
      setQueue(q);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshAll();
    const id = setInterval(refreshAll, 4000);
    return () => clearInterval(id);
  }, []);

  async function toggleAvailability(item: MenuItem) {
    const updated = await api<MenuItem>(`/canteen/menu/${item.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...item, available: !item.available }),
    });
    setMenu((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  }

  async function createMenuItem() {
    const name = prompt("Item name?");
    if (!name) return;
    const priceStr = prompt("Price?");
    const price = Number(priceStr ?? "0");
    const body: MenuCreate = { name, price, available: true };
    const created = await api<MenuItem>("/canteen/menu", { method: "POST", body: JSON.stringify(body) });
    setMenu((prev) => [created, ...prev]);
  }

  async function deleteMenuItem(id: string) {
    await api<void>(`/canteen/menu/${id}`, { method: "DELETE" });
    setMenu((prev) => prev.filter((m) => m.id !== id));
  }

  async function markPicked(id: string) {
    const picked = await api<Order>(`/canteen/orders/pickup/${id}`, { method: "PUT" });
    setQueue((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Menu CRUD */}
      <section className="col-span-7 rounded-xl border p-4 bg-background">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Menu & Inventory</h2>
          <div className="flex items-center gap-2">
            <button onClick={createMenuItem} className="rounded-md bg-primary px-3 py-2 text-white">Add Item</button>
          </div>
        </header>
        <div className="max-h-[60vh] overflow-auto rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Available</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((m) => (
                <tr key={m.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">₹{m.price.toFixed(2)}</td>
                  <td className="px-4 py-2">{m.available ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleAvailability(m)} className="rounded border px-2 py-1 text-xs">Toggle</button>
                      <button onClick={() => deleteMenuItem(m.id)} className="rounded border px-2 py-1 text-xs text-rose-600">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fulfillment Queue */}
      <section className="col-span-5 rounded-xl border p-4 bg-background">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Fulfillment Queue</h2>
          <span className="text-sm text-muted-foreground">{queue.length} pending</span>
        </header>
        <div className="max-h-[60vh] overflow-auto rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Order</th>
                <th className="px-4 py-2 text-left">Qty</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((o) => (
                <tr key={o.id} className="border-b hover:bg-muted/30">
                  <td className="px-4 py-2">{o.itemName}</td>
                  <td className="px-4 py-2">{o.qty}</td>
                  <td className="px-4 py-2">{new Date(o.createdAt).toLocaleTimeString()}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => markPicked(o.id)} className="rounded-md bg-emerald-600 px-3 py-1 text-white">Picked Up</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default function CampusConnectApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <AppContext.Provider value={value}>
      <div className="mx-auto max-w-[1400px] px-6 py-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Canteen Module</h1>
          <div className="flex items-center gap-2">
            <label htmlFor="role-select" className="text-sm text-muted-foreground">Role</label>
            <select
              id="role-select"
              className="rounded-md border bg-background px-2 py-1"
              aria-label="User role"
              title="User role"
              value={state.userRole}
              onChange={(e) => dispatch({ type: "SET_ROLE", role: e.target.value as UserRole })}
            >
              <option value="student">Student</option>
              <option value="canteen">Canteen In-charge</option>
            </select>
          </div>
        </header>

        {state.userRole === "student" ? <StudentView /> : <CanteenView />}
      </div>
    </AppContext.Provider>
  );
}
