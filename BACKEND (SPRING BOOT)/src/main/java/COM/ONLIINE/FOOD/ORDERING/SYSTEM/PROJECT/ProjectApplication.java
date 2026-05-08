package COM.ONLIINE.FOOD.ORDERING.SYSTEM.PROJECT;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.File;

@SpringBootApplication
public class ProjectApplication {

	static {
		try {
			// Try to load the DLL from the current directory or the backend folder
			String dllName = "mssql-jdbc_auth-12.4.2.x64.dll";
			File dllFile = new File(dllName);
			if (!dllFile.exists()) {
				dllFile = new File("BACKEND (SPRING BOOT)/" + dllName);
			}
			if (dllFile.exists()) {
				System.load(dllFile.getAbsolutePath());
			}
		} catch (Exception e) {
			System.err.println("Could not load native SQL Server auth library: " + e.getMessage());
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

}
