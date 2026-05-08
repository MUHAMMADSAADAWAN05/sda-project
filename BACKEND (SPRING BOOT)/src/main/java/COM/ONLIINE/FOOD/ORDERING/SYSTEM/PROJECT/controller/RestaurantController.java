package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.controller;

import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.MenuItem;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.Restaurant;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantRepository repository;

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    @GetMapping("/owner/{ownerId}")
    public Restaurant getRestaurantByOwner(@PathVariable Long ownerId) {
        return repository.findAll().stream()
                .filter(r -> r.getOwner() != null && r.getOwner().getId().equals(ownerId))
                .findFirst()
                .orElse(null);
    }

    @PostMapping
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
        return repository.save(restaurant);
    }

    @PutMapping("/{id}")
    public Restaurant updateRestaurant(@PathVariable Long id, @RequestBody Restaurant restaurantDetails) {
        Restaurant restaurant = repository.findById(id).orElseThrow();
        restaurant.setName(restaurantDetails.getName());
        restaurant.setLocation(restaurantDetails.getLocation());
        restaurant.setCuisine(restaurantDetails.getCuisine());
        restaurant.setImage(restaurantDetails.getImage());
        restaurant.setDescription(restaurantDetails.getDescription());
        restaurant.setDeliveryFee(restaurantDetails.getDeliveryFee());
        restaurant.setDeliveryTime(restaurantDetails.getDeliveryTime());
        return repository.save(restaurant);
    }

    @Autowired
    private COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository.MenuItemRepository menuItemRepository;

    @PostMapping("/{id}/menu")
    public MenuItem addMenuItem(@PathVariable Long id, @RequestBody MenuItem item) {
        try {
            Restaurant restaurant = repository.findById(id).orElseThrow();
            item.setRestaurant(restaurant);
            System.out.println("Adding menu item: " + item.getName() + " to restaurant: " + restaurant.getName());
            return menuItemRepository.save(item);
        } catch (Exception e) {
            System.err.println("Error adding menu item: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @DeleteMapping("/menu/{itemId}")
    public void deleteMenuItem(@PathVariable Long itemId) {
        menuItemRepository.deleteById(itemId);
    }
}
