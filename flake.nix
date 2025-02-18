{
  description = "noVNC is a web-based VNC client";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-darwin"
      ];

      eachSystem = nixpkgs.lib.genAttrs systems;

      mkPkgs = system: import nixpkgs {
        inherit system;
      };
    in
    {
      packages = eachSystem (system:
      let
        pkgs = mkPkgs system;
      in rec {
        devShell = pkgs.mkShell {
          packages = [
            pkgs.nodejs_20
            pkgs.chromedriver
            pkgs.chromium
          ];
        };
      });

      devShells = eachSystem (system: {
        default = self.packages.${system}.devShell;
      });
    };
}
