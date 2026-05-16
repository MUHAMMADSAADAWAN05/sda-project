package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fix-database")
public class DatabaseFixerController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/drop-constraints")
    public String dropConstraints() {
        try {
            // Drop the specific constraint mentioned in the logs
            jdbcTemplate.execute("ALTER TABLE orders DROP CONSTRAINT IF EXISTS CK__orders__status__5441852A");
            
            // Try to drop any other status check constraints just in case
            try {
                jdbcTemplate.execute("DECLARE @sql NVARCHAR(MAX) = ''; " +
                    "SELECT @sql += 'ALTER TABLE orders DROP CONSTRAINT ' + name + ';' " +
                    "FROM sys.check_constraints " +
                    "WHERE parent_object_id = OBJECT_ID('orders') AND definition LIKE '%status%'; " +
                    "EXEC sp_executesql @sql;");
            } catch (Exception e) {
                return "Dropped primary constraint, but failed to batch drop others: " + e.getMessage();
            }

            return "Database constraints dropped successfully! You can now update order statuses.";
        } catch (Exception e) {
            return "Failed to drop constraints: " + e.getMessage();
        }
    }
}
