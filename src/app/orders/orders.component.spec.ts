// src/app/order.service.spec.ts
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { OrderLocalStorageService } from "./orders-localstorage.service";
import { Order } from "./orders.model";

describe("OrderLocalStorageService", () => {
  let service: OrderLocalStorageService;
  let httpMock: HttpTestingController;

  const mockOrders: Order[] = [
    {
      orderId: "123",
      userData: {
        fullName: "João",
        email: "joao@teste.com",
        phone: 12934567890,
        place: "Rua A, 123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        cep: 12345678,
      },
      items: [
        {
          id: 1,
          title: "Produto 1",
          price: 50,
          description: "Produto 1 é o mais bonito",
          image: "",
        },
        {
          id: 2,
          title: "Produto 2",
          price: 100,
          description: "Produto 2 é o mais que bonito",
          image: "",
        },
      ],
      total: 200,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderLocalStorageService],
    });
    service = TestBed.inject(OrderLocalStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("deve ser criado", () => {
    expect(service).toBeTruthy();
  });

  it("deve criar um novo pedido", () => {
    const newOrder: Order = {
      orderId: "456",
      userData: {
        fullName: "Maria",
        email: "maria@teste.com",
        phone: 11988888888,
        place: "Rua B, 123",
        neighborhood: "Bairro Novo",
        city: "Rio de Janeiro",
        state: "RJ",
        cep: 22041001,
      },
      items: [
        {
          id: 3,
          title: "Produto 3",
          price: 300,
          description: "Produto 3 é lindo",
          image: "",
        },
      ],
      total: 300,
    };

    service.createOrder(newOrder).subscribe((order) => {
      expect(order).toEqual(newOrder);
    });

    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    expect(savedOrders.length).toBe(1);
    expect(savedOrders[0]).toEqual(newOrder);
  });

  it("deve obter todos os pedidos", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));

    service.getOrders().subscribe((orders) => {
      expect(orders.length).toBe(1);
      expect(orders).toEqual(mockOrders);
    });
  });

  it("deve limpar todos os pedidos", () => {
    localStorage.setItem("orders", JSON.stringify(mockOrders));

    service.clearOrders();

    const clearedOrders = localStorage.getItem("orders");
    expect(clearedOrders).toBeNull();
  });
});
