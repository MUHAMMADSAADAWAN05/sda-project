package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.controller;

import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.MenuItem;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.model.Restaurant;
import COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantRepository repository;

    @GetMapping
    @Transactional(readOnly = true)
    public List<Restaurant> getAllRestaurants() {
        List<Restaurant> restaurants = repository.findAll();
        // Force load menuItems within transaction so Jackson can serialize them
        for (Restaurant r : restaurants) {
            if (r.getMenuItems() != null) r.getMenuItems().size();
        }
        return restaurants;
    }

    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public Restaurant getRestaurantById(@PathVariable Long id) {
        Restaurant r = repository.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        // Force load menuItems within transaction
        if (r.getMenuItems() != null) r.getMenuItems().size();
        return r;
    }

    @GetMapping("/owner/{ownerId}")
    @Transactional(readOnly = true)
    public Restaurant getRestaurantByOwner(@PathVariable Long ownerId) {
        Restaurant r = repository.findAll().stream()
                .filter(rest -> rest.getOwner() != null && rest.getOwner().getId().equals(ownerId))
                .findFirst()
                .orElse(null);
        // Force load menuItems within transaction
        if (r != null && r.getMenuItems() != null) r.getMenuItems().size();
        return r;
    }

    @PostMapping
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
        return repository.save(restaurant);
    }

    @PutMapping("/{id}")
    @Transactional
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
    @Transactional
    public MenuItem addMenuItem(@PathVariable Long id, @RequestBody MenuItem item) {
        Restaurant restaurant = repository.findById(id).orElseThrow();
        item.setRestaurant(restaurant);
        return menuItemRepository.save(item);
    }

    @DeleteMapping("/menu/{itemId}")
    public void deleteMenuItem(@PathVariable Long itemId) {
        menuItemRepository.deleteById(itemId);
    }
}
