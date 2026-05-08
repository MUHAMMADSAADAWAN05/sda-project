package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.controller;

import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.Order;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.OrderItem;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.User;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository.OrderRepository;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        // Mock a user if not provided (for development without full auth)
        User user = null;
        if (order.getUser() == null || order.getUser().getId() == null) {
            user = userRepository.findById(2L).orElse(null); // Assign to a dummy customer user
            order.setUser(user);
        }
        
        order.setCreatedAt(new Date());
        order.setStatus("PLACED");
        
        // Link order items back to the order
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                item.setOrder(order);
            }
        }
        
        return orderRepository.save(order);
    }

    // Driver: Accept an order
    @PutMapping("/{id}/accept")
    public Order acceptOrder(@PathVariable Long id, @RequestBody User driver) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setDriver(driver);
        order.setStatus("ACCEPTED");
        return orderRepository.save(order);
    }

    // Update order status
    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestBody String status) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status.replace("\"", "")); // Remove quotes if string is sent as JSON
        return orderRepository.save(order);
    }

    // Get orders by restaurant
    @GetMapping("/restaurant/{restaurantId}")
    public List<Order> getRestaurantOrders(@PathVariable Long restaurantId) {
        return orderRepository.findAll().stream()
                .filter(o -> o.getRestaurant() != null && o.getRestaurant().getId().equals(restaurantId))
                .toList();
    }
}
