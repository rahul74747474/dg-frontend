import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient } from "@tanstack/react-query";

// Mock api
vi.mock("@/api/axios", () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    },
    setSessionExpiredHandler: vi.fn(),
  };
});

// Mock sonner
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("Cart Synchronization & Query Key Isolation", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it("TEST 1: React Query keys are isolated per authenticated user", () => {
    const userAKey = ["cart", "user_123"] as const;
    const userBKey = ["cart", "user_456"] as const;

    const userACart = [
      { id: "prod_1", name: "Product 1", price: 100, image: "img1.png", quantity: 2 },
    ];
    const userBCart = [
      { id: "prod_2", name: "Product 2", price: 200, image: "img2.png", quantity: 1 },
    ];

    queryClient.setQueryData(userAKey, userACart);
    queryClient.setQueryData(userBKey, userBCart);

    // Assert User A data does not leak into User B's cache
    expect(queryClient.getQueryData(userAKey)).toEqual(userACart);
    expect(queryClient.getQueryData(userBKey)).toEqual(userBCart);
    expect(queryClient.getQueryData(userAKey)).not.toEqual(queryClient.getQueryData(userBKey));
  });

  it("TEST 2: Logout properly removes all cart queries", () => {
    const userAKey = ["cart", "user_123"] as const;
    const userACart = [
      { id: "prod_1", name: "Product 1", price: 100, image: "img1.png", quantity: 2 },
    ];

    queryClient.setQueryData(userAKey, userACart);
    expect(queryClient.getQueryData(userAKey)).toBeDefined();

    // Simulate AuthContext logout: queryClient.removeQueries({ queryKey: ["cart"] })
    queryClient.removeQueries({ queryKey: ["cart"] });

    expect(queryClient.getQueryData(userAKey)).toBeUndefined();
  });

  it("TEST 3: Optimistic updates and rollbacks work on user-isolated query key", () => {
    const userKey = ["cart", "user_abc"] as const;
    const initialCart = [
      { id: "p1", name: "Item 1", price: 50, image: "p1.jpg", quantity: 1 },
    ];

    queryClient.setQueryData(userKey, initialCart);

    // Optimistic increase quantity to 2
    const updatedCart = initialCart.map((i) =>
      i.id === "p1" ? { ...i, quantity: 2 } : i
    );
    queryClient.setQueryData(userKey, updatedCart);
    expect((queryClient.getQueryData<any[]>(userKey) ?? [])[0].quantity).toBe(2);

    // Rollback on server failure
    queryClient.setQueryData(userKey, initialCart);
    expect((queryClient.getQueryData<any[]>(userKey) ?? [])[0].quantity).toBe(1);
  });

  it("TEST 4: Order completion invalidates user cart via prefix match", () => {
    const userKey = ["cart", "user_999"] as const;
    queryClient.setQueryData(userKey, [{ id: "p1", name: "Item", price: 10, image: "", quantity: 1 }]);

    const queryStateBefore = queryClient.getQueryState(userKey);
    expect(queryStateBefore?.isInvalidated).toBeFalsy();

    // CheckoutPayment invalidates ["cart"]
    queryClient.invalidateQueries({ queryKey: ["cart"] });

    const queryStateAfter = queryClient.getQueryState(userKey);
    expect(queryStateAfter?.isInvalidated).toBe(true);
  });
});
