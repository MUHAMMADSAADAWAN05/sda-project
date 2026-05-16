package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.controller;

import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.Order;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.OrderItem;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.User;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.Restaurant;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository.OrderRepository;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository.RestaurantRepository;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    // ── Robust DTO Mapping ──
    @Transactional(readOnly = true)
    public Map<String, Object> toDto(Order o) {
        if (o == null) return null;
        Map<String, Object> map = new HashMap<>();
        try {
            map.put("id", o.getId());
            map.put("status", o.getStatus());
            map.put("totalAmount", o.getTotalAmount());
            map.put("createdAt", o.getCreatedAt());
            map.put("deliveryAddress", o.getDeliveryAddress());
            map.put("paymentMethod", o.getPaymentMethod());

            // User
            try {
                User u = o.getUser();
                if (u != null) {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", u.getId());
                    userMap.put("name", u.getName());
                    userMap.put("email", u.getEmail());
                    map.put("user", userMap);
                }
            } catch (Exception e) { map.put("user", null); }

            // Restaurant
            try {
                Restaurant r = o.getRestaurant();
                if (r != null) {
                    Map<String, Object> restMap = new HashMap<>();
                    restMap.put("id", r.getId());
                    restMap.put("name", r.getName());
                    map.put("restaurant", restMap);
                    map.put("restaurantName", r.getName()); // Convenience for frontend
                }
            } catch (Exception e) { map.put("restaurant", null); }

            // Driver
            try {
                User d = o.getDriver();
                if (d != null) {
                    Map<String, Object> driverMap = new HashMap<>();
                    driverMap.put("id", d.getId());
                    driverMap.put("name", d.getName());
                    map.put("driver", driverMap);
                }
            } catch (Exception e) { map.put("driver", null); }

            // Items
            try {
                List<OrderItem> items = o.getItems();
                if (items != null) {
                    List<Map<String, Object>> itemList = new ArrayList<>();
                    for (OrderItem item : items) {
                        Map<String, Object> itemMap = new HashMap<>();
                        itemMap.put("id", item.getId());
                        itemMap.put("quantity", item.getQuantity());
                        itemMap.put("unitPrice", item.getUnitPrice());
                        try {
                            itemMap.put("name", item.getMenuItem() != null ? item.getMenuItem().getName() : "Item");
                        } catch (Exception e) { itemMap.put("name", "Item"); }
                        itemList.add(itemMap);
                    }
                    map.put("items", itemList);
                } else {
                    map.put("items", Collections.emptyList());
                }
            } catch (Exception e) { map.put("items", Collections.emptyList()); }

        } catch (Exception e) {
            System.err.println("Error mapping order " + o.getId() + " to DTO: " + e.getMessage());
        }
        return map;
    }

    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<List<Map<String, Object>>> getAllOrders() {
        return ResponseEntity.ok(orderRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList()));
    }

    @GetMapping("/restaurant/{restaurantId}")
    @Transactional(readOnly = true)
    public ResponseEntity<List<Map<String, Object>>> getRestaurantOrders(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(orderRepository.findOrdersByRestaurantId(restaurantId).stream()
                .map(this::toDto)
                .collect(Collectors.toList()));
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            if (order.getUser() != null && order.getUser().getId() != null) {
                order.setUser(userRepository.findById(order.getUser().getId()).orElse(null));
            }
            if (order.getRestaurant() != null && order.getRestaurant().getId() != null) {
                order.setRestaurant(restaurantRepository.findById(order.getRestaurant().getId()).orElse(null));
            }
            order.setCreatedAt(new Date());
            order.setStatus("PLACED");
            if (order.getItems() != null) {
                for (OrderItem item : order.getItems()) { item.setOrder(order); }
            }
            Order saved = orderRepository.save(order);
            return ResponseEntity.ok(toDto(saved));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/accept")
    @Transactional
    public ResponseEntity<?> acceptOrder(@PathVariable Long id, @RequestParam Long driverId) {
        System.out.println("Accepting order " + id + " for driver " + driverId);
        try {
            Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
            User driver = userRepository.findById(driverId).orElseThrow(() -> new RuntimeException("Driver not found"));
            
            order.setDriver(driver);
            order.setStatus("ACCEPTED");
            Order saved = orderRepository.save(order);
            
            return ResponseEntity.ok(toDto(saved));
        } catch (Exception e) {
            System.err.println("Error in acceptOrder: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    @Transactional
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody String status) {
        String cleanStatus = status.replace("\"", "").trim();
        System.out.println("Updating order " + id + " to status: " + cleanStatus);
        try {
            Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
            order.setStatus(cleanStatus);
            Order saved = orderRepository.save(order);
            return ResponseEntity.ok(toDto(saved));
        } catch (Exception e) {
            System.err.println("Error in updateStatus: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
