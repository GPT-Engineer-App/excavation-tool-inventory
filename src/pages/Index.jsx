import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [inventory, setInventory] = useState([]);
  const [newTool, setNewTool] = useState({ name: "", location: "truck" });

  const handleAddTool = () => {
    setInventory([...inventory, newTool]);
    setNewTool({ name: "", location: "truck" });
  };

  const handleDeleteTool = (index) => {
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center mb-4">Inventory Management System</h1>
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="trucks">Tools on Trucks</TabsTrigger>
          <TabsTrigger value="shop">Shop Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Overall Inventory Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total Tools: {inventory.length}</p>
              <p>Tools on Trucks: {inventory.filter(tool => tool.location === "truck").length}</p>
              <p>Shop Inventory: {inventory.filter(tool => tool.location === "shop").length}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trucks">
          <Card>
            <CardHeader>
              <CardTitle>Tools on Trucks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tool Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.filter(tool => tool.location === "truck").map((tool, index) => (
                    <TableRow key={index}>
                      <TableCell>{tool.name}</TableCell>
                      <TableCell>
                        <Button variant="destructive" onClick={() => handleDeleteTool(index)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shop">
          <Card>
            <CardHeader>
              <CardTitle>Shop Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tool Name</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.filter(tool => tool.location === "shop").map((tool, index) => (
                    <TableRow key={index}>
                      <TableCell>{tool.name}</TableCell>
                      <TableCell>
                        <Button variant="destructive" onClick={() => handleDeleteTool(index)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4">Add New Tool</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Tool</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Tool Name"
              value={newTool.name}
              onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded"
              value={newTool.location}
              onChange={(e) => setNewTool({ ...newTool, location: e.target.value })}
            >
              <option value="truck">Truck</option>
              <option value="shop">Shop</option>
            </select>
            <Button onClick={handleAddTool}>Add Tool</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;