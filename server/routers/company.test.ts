import { describe, it, expect } from "vitest";
import { companyRouter } from "./company";

describe("companyRouter", () => {
  it("should be defined", () => {
    expect(companyRouter).toBeDefined();
  });

  describe("Inputs Validation & Authorization", () => {
    it("should fail createProject if title is too short", async () => {
      // Mocked caller with minimal context
      const caller = companyRouter.createCaller({ db: {} as any, user: { id: 1, userType: "empresa" as any } as any });
      
      await expect(caller.createProject({
        title: "abc", // Too short
        description: "description longer than 20 characters for sure",
        category: "esg",
        duration: 10,
        teamSize: 2,
        requiredSkills: ["React"],
        budget: 1000
      })).rejects.toThrow();
    });

    it("should fail getProjectApplications if user is not empresa", async () => {
      const caller = companyRouter.createCaller({ db: {} as any, user: { id: 1, userType: "jovem" as any } as any });
      await expect(caller.getProjectApplications({ projectId: 1 })).rejects.toThrowError(/Only companies can view applications/);
    });

    it("should check if getMySquads requires 'empresa' user type", async () => {
      const caller = companyRouter.createCaller({ db: {} as any, user: { id: 1, userType: "jovem" as any } as any });
      await expect(caller.getMySquads({})).rejects.toThrowError(/Only companies can view squads/);
    });
  });
});
