import React, { useState, useMemo } from "react";
import {
  Alert,
  SafeAreaView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import data from "@/utils/example/data.json";
import { StatusBar } from "expo-status-bar";
import { Text } from "@/components/Themed";
import { Feather, FontAwesome } from "@expo/vector-icons";
import FilterSelector from "@/components/movement/filter-selector";
import Colors from "@/constants/Colors";
import TransactionsAll from "@/components/movement/transactions-all";

const FILTER = [
  { label: "Income", option: "INCOME" },
  { label: "Expense", option: "EXPENSE" },
  { label: "Food", option: "FOOD" },
  { label: "Shopping", option: "SHOPPING" },
  { label: "Service", option: "SERVICE" },
  { label: "job", option: "JOB" },
  { label: "Others", option: "OTHERS" },
  { label: "Freelance", option: "FREELANCE" },
];

export default function Transactions() {
  const theme = useColorScheme();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const filteredTransactions = useMemo(() => {
    if (selectedFilters.length === 0) {
      // Si no hay filtros seleccionados, retornar todas las transacciones
      return data;
    } else {
      // Filtrar las transacciones basadas en los filtros seleccionados
      return data.filter((transaction) => {
        // Verificar si la categoría de la transacción o el tipo de movimiento están incluidos en los filtros seleccionados
        const categoryMatch = selectedFilters.includes(transaction.category);
        const typeMoveMatch = selectedFilters.includes(transaction.type_move);
        return categoryMatch || typeMoveMatch;
      });
    }
  }, [selectedFilters, data]);
  
  const toggleFilter = (option: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(option)) {
        return prevFilters.filter((item) => item !== option);
      } else {
        return [...prevFilters, option];
      }
    });
  };
  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Colors[theme ?? "light"].background,
          flex: 1,
        }}
      >
        <StatusBar style="auto" />
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            paddingTop: 54,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Transactions</Text>
          <View style={{ flexDirection: "row" }} className="gap-2">
            <TouchableOpacity onPress={() => Alert.alert("search")}>
              <FontAwesome
                name="search"
                size={24}
                color={theme === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFilter(true)}>
              <Feather
                name="filter"
                size={24}
                color={theme === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TransactionsAll transactions={filteredTransactions} />
      </SafeAreaView>
      {showFilter && (
        <FilterSelector
          onClose={() => setShowFilter(false)}
          onSelectFilter={toggleFilter}
          filter={FILTER}
          selectedFilters={selectedFilters}
        />
      )}
    </>
  );
}
